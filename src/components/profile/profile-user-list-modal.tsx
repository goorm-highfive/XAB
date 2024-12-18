'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog' // Shadcn Dialog
import { SearchBar } from '~/components/profile/profile-search-bar'
import { UserFollowList } from '~/components/profile/profile-user-follow-list'
import { useRouter } from 'next/navigation'
import { User, UserListModalProps } from '~/types/profile' // 타입 불러오기

function LoadingIndicator() {
  return <p className="text-center">Loading...</p>
}

function ErrorIndicator({ message }: { message: string }) {
  return <p className="text-center text-red-500">{message}</p>
}

function UserListModal({ title, apiEndpoint }: UserListModalProps) {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint)
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        setUsers(data)
        setFilteredUsers(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error occurred.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [apiEndpoint])

  const handleSearch = (query: string) => {
    setFilteredUsers(
      users.filter((user: User) =>
        user.name.toLowerCase().includes(query.toLowerCase()),
      ),
    )
  }

  const handleClose = () => {
    router.back() // 모달 닫기 시 이전 페이지로 돌아감
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="mx-auto mt-20 max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorIndicator message={error} />
        ) : (
          <>
            <SearchBar onSearch={handleSearch} />
            <div className="mt-4 space-y-4">
              <UserFollowList users={filteredUsers} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export { UserListModal }
