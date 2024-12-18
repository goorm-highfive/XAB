'use client'

import React, { useState } from 'react'
import { Input } from '~/components/ui/input' // Shadcn UI Input 컴포넌트
import { Button } from '~/components/ui/button' // Shadcn UI Button 컴포넌트
import { Search } from 'lucide-react' // 아이콘 라이브러리 사용

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    onSearch(query) // 부모 컴포넌트로 검색어 전달
  }

  return (
    <div className="mx-auto flex w-full max-w-lg items-center overflow-hidden rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      {/* Input */}
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border-none px-4 py-2 focus:border-transparent focus:outline-none focus:ring-0"
      />
      {/* Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearch}
        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-0"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  )
}

export { SearchBar }
