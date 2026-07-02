"use client";

import { isUnlockPinValid } from "@/views/listening/lib/unlock-pin";

export async function promptUnlockPin(options?: { bypass?: boolean }): Promise<boolean> {
  if (options?.bypass) {
    return true;
  }

  const { default: Swal } = await import("sweetalert2");

  const result = await Swal.fire({
    title: "Unlock hints & answers",
    text: "Enter the PIN to view vocabulary and reveal answers.",
    input: "password",
    inputPlaceholder: "PIN",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
      autocomplete: "off",
      inputmode: "numeric",
    },
    showCancelButton: true,
    confirmButtonText: "Unlock",
    cancelButtonText: "Cancel",
    focusCancel: false,
    heightAuto: false,
    returnFocus: false,
    customClass: {
      container: "listening-swal-container",
      popup: "listening-swal-popup",
    },
    preConfirm: (value) => {
      if (!isUnlockPinValid(value ?? "")) {
        Swal.showValidationMessage("Incorrect PIN");
        return false;
      }

      return value;
    },
  });

  return result.isConfirmed;
}
