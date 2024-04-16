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

export const abi = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "doctorAddress",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "userDataCID",
              "type": "string"
          }
      ],
      "name": "DoctorProfileReceived",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "doctorAddress",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "userDataCID",
              "type": "string"
          }
      ],
      "name": "DoctorRegistered",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "doctors",
      "outputs": [
          {
              "internalType": "address",
              "name": "doctorAddress",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "profileReceived",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
          },
          {
              "internalType": "string",
              "name": "userDataCID",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "owner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_userDataCID",
              "type": "string"
          }
      ],
      "name": "receiveDoctorProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "_doctorAddress",
              "type": "address"
          }
      ],
      "name": "registerDoctor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
]