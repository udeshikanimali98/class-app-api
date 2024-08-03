import { ApplicationError } from "../common/application-error";
import { StringOrObjectId } from "../common/util";

import { OtpTypes } from "../enums/otpTypes";
import OTPModel, { OTP } from "../models/otp-modal";

export namespace OTPDao {
  /**
   * Generates and saves a 6-digit OTP with expiration time for a user.
   * @param userId - The ID of the user.
   * @param expirationMinutes - The expiration time of the OTP in minutes.
   * @returns A Promise resolving to the generated OTP details.
   * @throws ApplicationError if an error occurs during OTP generation and storage.
   */
  export async function createOTP(
    email: string,
    expirationMinutes: number,
    otpType: OtpTypes
  ): Promise<OTP> {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Save OTP in the database with expiration time
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);

      const otpDetails = await OTPModel.create({
        email,
        otp,
        otpType,
        expiresAt,
      });

      return otpDetails;
    } catch (error: any) {
      throw new ApplicationError(`Error creating OTP: ${error.message}`);
    }
  }

  /**
   * Retrieves the OTP details for a user.
   * @param userId - The ID of the user.
   * @returns A Promise resolving to the OTP details or null if not found.
   * @throws ApplicationError if an error occurs during OTP retrieval.
   */
  export async function getOTP(email: StringOrObjectId): Promise<OTP | null> {
    try {
      const otpDetails = await OTPModel.findOne({ email });
      return otpDetails;
    } catch (error: any) {
      throw new ApplicationError(`Error getting OTP: ${error.message}`);
    }
  }

  export async function getLatestOTP(email: string): Promise<OTP | null> {
    // Retrieve the latest OTP for the user
    const latestOTP = await OTPModel.findOne({ email: email }).sort({
      createdAt: -1,
    });

    return latestOTP;
  }

  /**
   * Deletes the OTP details for a user.
   * @param userId - The ID of the user.
   * @throws ApplicationError if an error occurs during OTP deletion.
   */
  export async function deleteOTP(email: StringOrObjectId): Promise<void> {
    try {
      await OTPModel.deleteOne({ email });
    } catch (error: any) {
      throw new ApplicationError(`Error deleting OTP: ${error.message}`);
    }
  }
}
