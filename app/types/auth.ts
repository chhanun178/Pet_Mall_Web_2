export type Role = 'CUSTOMER' | 'VENDOR' | 'ADMIN'

export type VendorStatus = 'ACTIVE' | 'SUSPENDED'

export type BusinessCategory =
  | 'PET_FOOD'
  | 'ACCESSORIES'
  | 'GROOMING'
  | 'VET_CLINIC'

export interface CustomerProfile {
  fullName: string
  loyaltyPoints: number
  avatarUrl?: string
}

export interface VendorProfile {
  ownerName: string
  storeName: string
  storeSlug: string
  businessCategory: BusinessCategory
  taxOrLicenseId: string
  vendorStatus: VendorStatus
}

export interface AuthUser {
  id: string
  email: string
  phone?: string
  role: Role
  isEmailVerified: boolean
  customerProfile?: CustomerProfile
  vendorProfile?: VendorProfile
}

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export interface LoginPayload {
  email: string
  password: string
  expectedRole?: Role
}

export interface RegisterCustomerPayload {
  fullName: string
  email: string
  phone?: string
  password: string
}

export interface RegisterResponse {
  requiresOtpVerification: boolean
  email: string
  message: string
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface ResendOtpPayload {
  email: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  otp: string
  newPassword: string
}
