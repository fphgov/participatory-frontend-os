import Link from 'next/link'

type Tab = {
  id: number
  name: string
}

type TabsProps = {
  currentTab: number
}

export default function Tabs({ currentTab }: TabsProps): JSX.Element|null {
  const categories = [
    { category: { id: 0, name: 'Összes' } },
    { category: { id: 1, name: 'Hír' } },
    { category: { id: 2, name: 'Rendezvény' } },
    { category: { id: 3, name: 'Blog' } },
  ]

  const createTabs = (): Tab[] => {
    return categories.map((t) => {
      return {
        id: t.category.id,
        name: t.category.name,
      }
    }).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).sort((a, b) => a.id - b.id)
  }

  const tabs = createTabs()

  return (
    <>
      <div className="tab-wrapper">
        <ul className="tab">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              tabIndex={tab.id}
              className={`${currentTab === tab.id ? 'active' : ''}`}
            >
                <Link href={`/hirek?cat=${tab.id}`} prefetch={true}>{tab.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
