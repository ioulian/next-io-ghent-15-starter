"use client";

import type { FC } from "react";

import { ComponentPropsWithRef, memo, useState } from "react";

import { useMessages } from "next-intl";
import { useWatch } from "react-hook-form";
import { useDebounce } from "react-use";

import { INPUT_DEBOUNCE_DELAY } from "@/utils/constants";
import { addClassNameToProps } from "@/utils/styles";

import { passwordStrength } from "./PasswordStrength.styles";
import { validatePassword } from "./PasswordStrength.utils";

const PasswordStrength: FC<{ name: string } & ComponentPropsWithRef<"div">> = ({ name, ...props }) => {
  const messages = useMessages();
  const value = useWatch({ name });

  const [score, setScore] = useState<number>(-1);
  const [message, setMessage] = useState<string>("");

  useDebounce(
    () => {
      if (typeof value === "string" && value.length > 0) {
        validatePassword(value, messages.common.form.passwordStrength.messages).then((result) => {
          setScore(result.score);
          setMessage(result.crackTimesDisplay.offlineSlowHashing1e4PerSecond);
        });
      } else {
        // False positive

        setScore(-1);
        setMessage("");
      }
    },
    INPUT_DEBOUNCE_DELAY,
    [value, messages.common.form.passwordStrength.messages],
  );

  const classes = passwordStrength();

  return (
    <div {...addClassNameToProps(props, classes.container())}>
      <div className={classes.bar()}>
        <div data-score={score} className={classes.barInner()} />
      </div>
      <div aria-live="polite" className={classes.message()}>
        {message}
      </div>
    </div>
  );
};

/**
 * Password strength meter
 */
export default memo(PasswordStrength);
