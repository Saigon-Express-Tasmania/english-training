"use client";

type ConfirmEmptyBlanksOptions = {
  filledCount: number;
  totalBlanks: number;
};

export async function confirmCheckWithEmptyBlanks({
  filledCount,
  totalBlanks,
}: ConfirmEmptyBlanksOptions): Promise<boolean> {
  const { default: Swal } = await import("sweetalert2");

  const result = await Swal.fire({
    title: "Some blanks are empty",
    html: `You have filled <strong>${filledCount}</strong> of <strong>${totalBlanks}</strong> blanks.<br>Check answers anyway?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Check anyway",
    cancelButtonText: "Keep filling",
    focusCancel: true,
    heightAuto: false,
    returnFocus: false,
    customClass: {
      container: "listening-swal-container",
      popup: "listening-swal-popup",
    },
  });

  return result.isConfirmed;
}
