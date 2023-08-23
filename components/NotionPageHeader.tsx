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
              viewBox="0 0 512 512">
              <path fill="none" d="M139.67,289.6c-11.96,17.93-32.53,29.78-55.91,29.78c-17.12,0-32.73-6.35-44.57-16.79
                c13.4,63.86,55.02,122.67,126.85,154.41c61.03,27.5,139.7,31.14,206.79-7.57c3.18-1.83,1.52-6.65-2.13-6.22
                C268.22,455.34,166.67,385.65,139.67,289.6z"/>
              <path fill="none" d="M83.76,301.65c26.98,0,48.93-21.66,48.93-48.28h0.54c-0.43-5.61-0.6-11.28-0.5-17
                c-1.86-83.29,49.03-160.33,124.82-194.57c3.8-1.72,2.41-7.39-1.77-7.22C112.46,40.19,35.7,146.08,34.41,253.37h0.42
                C34.83,279.99,56.78,301.65,83.76,301.65z"/>
              <ellipse fill="none" cx="412.84" cy="213.25" rx="66.64" ry="66.43"/>
              <path fill="none" d="M407.86,99.71c4.32,0.09,6.48-5.12,3.28-7.99c-4.36-3.91-8.88-7.65-13.54-11.22
                c-24.79-18.95-71.47-34.78-102.16-28.4c-48.67,10.12-92.81,48.64-118.15,91.33c-16.83,27.77-24.97,60.18-24.97,92.55
                c0,110.87,120.01,200.47,216.54,184.08C266.94,384.4,237.6,321.72,239.34,261.84c-0.65-54.69,27.65-105.47,75.73-135.88
                C343.65,107.88,375.91,99.04,407.86,99.71z"/>
              <path d="M412.84,311.76c54.76,0,99.16-44.11,99.16-98.51c0-7.46-0.84-14.73-2.42-21.72c-3.57-22.25-12.75-45.57-29.73-70.94
                c-27.21-40.68-63.54-74.25-107.92-95.26l-1.04-0.47C233.48-44.45,42.99,37.92,9.03,188.6C-23.9,312.55,35.35,435.98,151.8,487.77
                c112.72,51.93,249.05,18.89,320.67-84.74c4.96-6.9,4.16-16.26-1.89-22.25c-6.05-5.99-15.54-6.81-22.58-1.92
                c-0.03,0.02-0.07,0.05-0.1,0.07c-7.51,5.23-16.19,8.6-25.26,10.07c-74.38,12.03-151.89-50.99-148.99-127.12
                c-1.49-44.55,23.38-83.29,58.79-106.28c-11.79,16.21-18.74,36.11-18.74,57.64C313.68,267.65,358.08,311.76,412.84,311.76z
                M412.84,279.68c-36.75,0-66.64-29.8-66.64-66.43s29.9-66.43,66.64-66.43s66.64,29.8,66.64,66.43S449.59,279.68,412.84,279.68z
                M34.41,253.37c1.29-107.3,78.05-213.19,221.37-218.79c4.18-0.16,5.57,5.5,1.77,7.22c-75.79,34.24-126.68,111.28-124.82,194.57
                c-0.1,5.72,0.08,11.39,0.5,17h-0.54c0,26.62-21.95,48.28-48.93,48.28s-48.93-21.66-48.93-48.28H34.41z M372.83,449.42
                c-67.09,38.71-145.76,35.07-206.79,7.57C94.21,425.25,52.59,366.44,39.19,302.58c11.83,10.44,27.44,16.79,44.57,16.79
                c23.38,0,43.95-11.85,55.91-29.78c27,96.05,128.55,165.74,231.03,153.61C374.35,442.77,376,447.59,372.83,449.42z M239.34,261.84
                c-1.75,59.88,27.59,122.57,129.52,158.23c-96.53,16.4-216.54-73.21-216.54-184.08c0-32.37,8.15-64.78,24.97-92.55
                c25.34-42.69,69.48-81.21,118.15-91.33c30.69-6.38,77.36,9.45,102.16,28.4c4.66,3.56,9.18,7.3,13.54,11.22
                c3.2,2.87,1.04,8.08-3.28,7.99c-31.96-0.67-64.21,8.17-92.79,26.24C266.99,156.37,238.69,207.15,239.34,261.84z"/>
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
