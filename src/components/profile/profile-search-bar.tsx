'use client'

import React, { useState } from 'react'
import { Input } from '~/components/ui/input' // Shadcn UI Input 컴포넌트
import { Button } from '~/components/ui/button' // Shadcn UI Button 컴포넌트
import { Search } from 'lucide-react' // 아이콘 라이브러리 사용

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query) // 부모 컴포넌트로 검색어 전달
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-lg items-center overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      {/* Input (✅ 모든 포커스 효과 제거) */}
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault() // 폼 제출 방지
            handleSearch()
          }
        }}
        className="flex-1 border-none bg-transparent px-4 py-2 outline-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0"
      />
      {/* Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearch}
        className="border-none text-gray-500 outline-none hover:text-gray-700 focus:ring-0"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}

export { SearchBar }
