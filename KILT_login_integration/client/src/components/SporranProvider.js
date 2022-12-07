import React, { useEffect } from "react";

export const SporranProvider = () => {
    const title = "KILT login";

    useEffect(() => {
        window.kilt = {};
        window.kilt.sporran.signWithDid(title);
      });

}
