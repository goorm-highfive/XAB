'use client'

import Image from 'next/image'
import defaultProfile from '~/assets/svg/default-profile.svg'
import { Card } from '~/components/ui/card'
import { CustomAlertDialog } from '~/components/common/custom-alert-dialog'
import { Heart } from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { Share2 } from 'lucide-react'
import { useState } from 'react'

function PostView() {
  const [voteBtnBool, setVoteBtnBool] = useState(true)

  const voteBtnOnClick = () => {
    setVoteBtnBool(false)
  }

  // 투표 버튼 클릭시 투표 버튼 사라짐 -> 투표 완료 확인용
  const renderVoteButton = (triggerBtnText: string, option: string) => {
    return (
      voteBtnBool && (
        <CustomAlertDialog
          alertTitle={`Your vote for ${option} has been successfully submitted.`}
          triggerBtnText={triggerBtnText}
          actionBtnText="Confirm"
          onActionClick={() => voteBtnOnClick()}
        />
      )
    )
  }

  return (
    <>
      <div className="post-writer mb-4 flex items-center">
        <div className="user-img mr-3 h-10 w-10 overflow-hidden rounded-full">
          <Image src={defaultProfile} alt="" />
        </div>
        <div>
          <p>
            <b>Sarah Anderson</b>
          </p>
          <p className="text-sm text-muted-foreground">
            Posted on Jan 15, 2025
          </p>
        </div>
      </div>
      <Card className="p-6">
        <article className="post-view">
          <h2 className="pb-4 text-xl font-semibold">
            Which landing page design do you prefer?
          </h2>
          <ul className="option-box grid grid-cols-2 gap-6">
            <li className="rounded-[8px] border p-4">
              <div className="vote-cont flex h-[192px] items-center justify-center overflow-hidden rounded-[8px] text-center">
                Design Option A
              </div>
              <div className="vote-state mt-4 flex h-[40px] items-center justify-between">
                <p className="font-medium">Option A</p>
                <div className="flex items-center">
                  <p className="vote-percent mr-3">64%</p>
                  {renderVoteButton('Vote', 'Option A')}
                </div>
              </div>
            </li>
            <li className="rounded-[8px] border p-4">
              <div className="vote-cont flex h-[192px] items-center justify-center overflow-hidden rounded-[8px] text-center">
                Design Option B
              </div>
              <div className="vote-state mt-4 flex h-[40px] items-center justify-between">
                <p className="font-medium">Option B</p>
                <div className="flex items-center">
                  <p className="vote-percent mr-3">36%</p>
                  {renderVoteButton('Vote', 'Option B')}
                </div>
              </div>
            </li>
          </ul>
          <div className="post-actions mt-6 flex items-center justify-between border-t pb-0 pl-6 pr-6 pt-5 text-sm text-muted-foreground">
            <div className="left flex items-center">
              <button type="button" className="mr-4 flex items-center">
                <Heart size={14} className="mr-1" />
                24
              </button>
              <button type="button" className="mr-4 flex items-center">
                <MessageCircle size={14} className="mr-1" />
                89
              </button>
              <button type="button" className="mr-4 flex items-center">
                <Share2 size={14} className="mr-1" />
                Share
              </button>
            </div>
            <div className="right">
              <span>1,234 votes</span>
            </div>
          </div>
        </article>
      </Card>
    </>
  )
}

export { PostView }
