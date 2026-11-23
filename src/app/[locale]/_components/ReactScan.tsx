"use client";

// react-scan must be imported before react
// prettier-ignore
import { scan } from "react-scan";

import { useEffect } from "react";

function ReactScan() {
  useEffect(() => {
    scan({
      enabled: true,
      animationSpeed: "slow",
      // trackUnnecessaryRenders: true,
    });
  }, []);

  // Needed for react-scan
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

export default ReactScan;
