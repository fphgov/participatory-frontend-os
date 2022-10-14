import React from "react"

export default function Tabs({ tabs, currentTabIndex, handleClickTab }) {
  return (
    <div className="tab-wrapper">
      <ul className="tab">
        {tabs.map((tab) => (
          <li key={tab.id} tabIndex={tab.id} tabname={tab.name} className={`${currentTabIndex === tab.id ? 'active' : ''}`} onClick={handleClickTab}><a>{tab.name}</a></li>
        ))}
      </ul>
    </div>
  )
}
