import * as React from 'react'

import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
// import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'
import { Header, Search, useNotionContext } from 'react-notion-x'
import Link from 'next/link'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  )
}

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
          <Link 
            href="/"
            aria-label="go to homepage">
            <svg
              className="homepage_link"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 520 520">
              <path fillRule="evenodd" clipRule="evenodd" d="M496 248C496 384.967 384.967 496 248 496C111.033 496 0 384.967 0 248C0 111.033 111.033 0 248 0C384.967 0 496 111.033 496 248ZM238.356 470.076L238.356 25.924C120.067 30.9737 25.7185 128.469 25.7185 248C25.7185 367.531 120.067 465.026 238.356 470.076ZM283.817 467.411C275.247 468.799 266.513 469.697 257.644 470.076V258.07C312.732 262.948 355.926 309.215 355.926 365.57C355.926 412.621 325.818 452.64 283.817 467.411ZM344.747 448.179C363.744 425.952 375.215 397.101 375.215 365.57C375.215 298.556 323.398 243.644 257.644 238.716V186H342.607V166.711H257.644L257.644 100.578H342.607V81.2889H257.644V25.924C375.933 30.9737 470.281 128.469 470.281 248C470.281 336.086 419.044 412.205 344.747 448.179Z"/>            
              </svg>

          </Link>

        {/* <Breadcrumbs block={block} rootOnly={true} /> */}

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
