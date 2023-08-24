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
              <path fillRule="evenodd" clipRule="evenodd" d="M237.037 467.213L237.037 32.7872C122.899 39.4932 32.4074 134.179 32.4074 250C32.4074 365.821 122.899 460.507 237.037 467.213ZM298.942 462.066C287.279 464.747 275.258 466.49 262.963 467.213V263.751C315.144 270.141 355.556 314.61 355.556 368.519C355.556 409.152 332.596 444.423 298.942 462.066ZM362.802 436.108C374.662 416.357 381.481 393.234 381.481 368.519C381.481 300.277 329.494 244.179 262.963 237.668V190.741H345.37V164.815H262.963L262.963 104.63H345.37V78.7037H262.963V32.7872C377.101 39.4933 467.593 134.179 467.593 250C467.593 328.875 425.625 397.948 362.802 436.108ZM250 500C388.071 500 500 388.071 500 250C500 111.929 388.071 0 250 0C111.929 0 0 111.929 0 250C0 388.071 111.929 500 250 500Z"/>              </svg>

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
