export interface ValidationError {
  field: string
  message: string
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\D/g, ""))
}

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*)")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2
}

export const validateRegistration = (data: {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!validateFullName(data.fullName)) {
    errors.push({
      field: "fullName",
      message: "Full name must be at least 2 characters",
    })
  }

  if (!validateEmail(data.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    })
  }

  if (!validatePhone(data.phone)) {
    errors.push({
      field: "phone",
      message: "Phone number must be 10 digits",
    })
  }

  const passwordValidation = validatePassword(data.password)
  if (!passwordValidation.valid) {
    errors.push({
      field: "password",
      message: passwordValidation.errors[0],
    })
  }

  if (data.password !== data.confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Passwords do not match",
    })
  }

  return errors
}

export const validateLogin = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!validateEmail(email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    })
  }

  if (!password || password.length < 1) {
    errors.push({
      field: "password",
      message: "Password is required",
    })
  }

  return errors
}
