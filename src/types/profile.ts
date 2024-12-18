// src/types/profile.d.ts

interface User {
  id: number
  name: string
}

interface UserListModalProps {
  title: string
  apiEndpoint: string
}

export type { UserListModalProps, User }
