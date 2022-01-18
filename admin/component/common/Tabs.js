import React from "react"

export default function Tabs({ children, value, onChange }) {
  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        {
          React.Children
            .toArray(children)
            .filter((child) => child.type.name === 'TabContent')
            .map((child, key) =>
              <div key={key} className={`tab ${value === child.props.id ? 'tab-active': ''}`} onClick={() => { onChange(child.props.id) }}>
                {child.props.name}
              </div>
            )
        }
      </div>

      <div className="tabs-contents">
        {React.Children.toArray(children).filter((child) => child.type.name === 'TabContent' && child.props.id === value)}
      </div>
    </div>
  )
}
