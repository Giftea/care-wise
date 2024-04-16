import { getDefaultConfig } from "connectkit";
import { etherlinkTestnet } from "viem/chains";
import { createConfig, http } from "wagmi";

const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"] ?? "";
export const doctorRegistrationDeployment = process.env["NEXT_PUBLIC_DOCTOR_REG_CONTRACT"] ?? "0xa8c564fA8Ebd7d0e79515BBd13Efa63eE83d6cA6";
export const patientRegistrationDeployment = process.env["NEXT_PUBLIC_PATIENT_REG_CONTRACT"] ?? "";
export const appointmentBookingDeployment = process.env["NEXT_PUBLIC_APPOINTMENT_CONTRACT"] ?? "";
export const chainId = 128123;

export const config = createConfig(
  getDefaultConfig({
    appName: "care-wise",
    walletConnectProjectId: projectId,
    chains: [etherlinkTestnet],
    ssr: true,
    transports: {
      [etherlinkTestnet.id]: http("https://node.ghostnet.etherlink.com"),
    },
    appDescription:
      "",
    appUrl: "",
    appIcon: "",
  })
);
