"use client";

import type { ComponentPropsWithRef, FC } from "react";

import { memo, useState, useTransition } from "react";

import { useMessages } from "next-intl";
import { useDebounce } from "react-use";

import { isString } from "@/types/type-guards";

import { INPUT_DEBOUNCE_DELAY } from "@/utils/constants";
import { addClassNameToProps } from "@/utils/styles";

import { passwordStrength } from "./PasswordStrength.styles";
import { validatePassword } from "./PasswordStrength.utils";

export type PasswordStrengthProps = { value?: string } & ComponentPropsWithRef<"div">;

const PasswordStrength: FC<PasswordStrengthProps> = ({ value, ...props }) => {
  const messages = useMessages();

  const [score, setScore] = useState<number>(-1);
  const [message, setMessage] = useState<string>("");
  const [, start] = useTransition();

  // TODO: use deferred value?
  useDebounce(
    () => {
      if (isString(value) && value.length > 0) {
        start(() => {
          validatePassword(value, messages.common.form.passwordStrength.messages).then((result) => {
            setScore(result.score);
            setMessage(result.crackTimesDisplay.offlineSlowHashing1e4PerSecond);
          });
        });
      } else {
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
