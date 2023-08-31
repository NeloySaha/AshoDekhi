import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  }, [pathname]);

  return null;
};
