import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { useHistory } from 'react-router-dom'
import { Translations } from '../translate'
import { esAR } from '../translate/es_AR'

export interface SharedProps {
  routes: RouteProps[]
  menu: MenuProps[]
  lang: Translations
  // withSearch?: boolean
  // showUser?: boolean
  userMenu?: UserMenuProps[]
  userIcon?: ReactNode
  extraIcons?: IconsProps[]
  menuDrawerWidth?: number
  menuDrawerIcon?: ReactNode
  menuDrawerHeader?: ReactNode
  rightDrawerWidth?: number
  rightComponent?: () => ReactNode
  config: UseNavigatorConfig
  loading?: boolean
  maintainIcons?: boolean
  loginPath?: string
  blockUi?: 'backdrop' | 'bottomRight'
  multipleRoutesComponent?: (history: any) => ReactNode
}

interface ProviderProps extends SharedProps {
  children: ReactNode
}

export interface RouteProps<T = string> {
  route: T
  component: ReactNode
  hidden?: boolean
  exact?: boolean
}

export interface MenuProps<T = string> {
  route?: T
  title?: string
  icon?: ReactNode
  description?: string
  onClick?: (history: any) => void
  hidden?: boolean
}

export interface IconsProps {
  id: string
  icon: ReactNode
  badgeCount?: number
  tooltip?: string
  onClick?: () => void
}

type NoRouteMenu = Omit<MenuProps, 'route'>
export interface UserMenuProps extends NoRouteMenu {
  id?: string
  keepOpen?: boolean
}

interface State extends SharedProps {
  drawer: boolean
  right?: boolean
}

type Action =
  | { type: 'MENU'; open: boolean }
  | { type: 'CONFIG'; config: UseNavigatorConfig }
  | { type: 'RIGHT'; open: boolean }
  | { type: 'RIGHTCOMPONENT'; component: () => ReactNode }
  | { type: 'EXTRAICONS'; extraIcons: IconsProps[] }
  | { type: 'ALL'; data: Partial<State> }
  | { type: 'LOADING'; loading: boolean; blockUi: 'backdrop' | 'bottomRight' }

interface ContextProps {
  state: State
  dispatch: Dispatch<Action>
}

const initialState: State = {
  drawer: false,
  menuDrawerWidth: 240,
  rightDrawerWidth: 240,
  menu: [],
  routes: [],
  lang: esAR,
  config: { title: 'Material Navigator' }
}

const initialValue: ContextProps = {
  state: initialState,
  dispatch: () => null
}

const NavigatorContext = createContext(initialValue)

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'MENU':
      return {
        ...state,
        drawer: action.open
      }
    case 'CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.config
        }
      }
    case 'EXTRAICONS':
      return {
        ...state,
        extraIcons: action.extraIcons
      }
    case 'RIGHT':
      return {
        ...state,
        right: action.open
      }
    case 'RIGHTCOMPONENT':
      return {
        ...state,
        rightComponent: action.component
      }
    case 'ALL':
      return { ...state, ...action.data }
    case 'LOADING':
      return { ...state, loading: action.loading, blockUi: action.blockUi }
    default:
      return state
  }
}

export const NavigatorProvider = (props: ProviderProps) => {
  const { children, ...providerProps } = props
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...providerProps })

  const { menu, routes, userMenu, extraIcons } = providerProps
  useEffect(() => {
    dispatch({ type: 'ALL', data: { menu, routes, userMenu, extraIcons } })
  }, [extraIcons, menu, routes, userMenu])

  return (
    <NavigatorContext.Provider value={{ state, dispatch }}>{children}</NavigatorContext.Provider>
  )
}

export const useLang = () => {
  const { state } = useContext(NavigatorContext)
  return state.lang
}

interface UseNavigatorConfig {
  title?: string
  showUser?: boolean
  noDrawerMenu?: boolean
  noSearch?: boolean
  onlyTitle?: boolean // Lo mismo que las 3 de arriba activadas juntas
  contrastColor?: string
  goBack?: boolean
  titleWidth?: string | number
  noPadding?: boolean
  onlyContent?: boolean
}

export const useNavigatorConfig = (props?: UseNavigatorConfig) => {
  const { state, dispatch } = useContext(NavigatorContext)
  const {
    title,
    noDrawerMenu,
    noSearch,
    showUser,
    onlyTitle,
    goBack,
    titleWidth,
    noPadding,
    onlyContent
  } = props || {}

  useEffect(() => {
    const config = {
      title,
      noDrawerMenu,
      noSearch,
      showUser,
      onlyTitle,
      goBack,
      titleWidth,
      noPadding,
      onlyContent
    }
    if (
      title ||
      noDrawerMenu ||
      noSearch ||
      showUser ||
      onlyTitle ||
      goBack ||
      titleWidth ||
      noPadding ||
      onlyContent
    ) {
      Object.keys(config).forEach((key) => config[key] === undefined && delete config[key])
      dispatch({ type: 'CONFIG', config })
    }
  }, [
    title,
    noDrawerMenu,
    noSearch,
    showUser,
    onlyTitle,
    dispatch,
    goBack,
    titleWidth,
    noPadding,
    onlyContent
  ])

  return state.config
}

type SetExtraActionsProps = (extraActions: IconsProps[]) => IconsProps[]

export const useNavigator = () => {
  const { state, dispatch } = useContext(NavigatorContext)
  const history = useHistory()

  const toggleMenu = useCallback(
    (open?: boolean) => dispatch({ type: 'MENU', open: open || !state.drawer }),
    [dispatch, state.drawer]
  )

  const toggleRightDrawer = useCallback(
    (open?: boolean) => dispatch({ type: 'RIGHT', open: open || !state.right }),
    [dispatch, state.right]
  )

  const setExtraIcons = useCallback(
    (props: SetExtraActionsProps) => {
      const extraIcons = props(state.extraIcons || [])
      dispatch({ type: 'EXTRAICONS', extraIcons })
    },
    [dispatch, state.extraIcons]
  )

  const setRightComponent = useCallback(
    (component: () => ReactNode) => dispatch({ type: 'RIGHTCOMPONENT', component }),
    [dispatch]
  )

  const setLoading = useCallback(
    (loading: boolean, blockUi?: 'backdrop' | 'bottomRight') =>
      dispatch({ type: 'LOADING', loading, blockUi: blockUi || state.blockUi || 'backdrop' }),
    [dispatch, state.blockUi]
  )

  return {
    ...state,
    toggleMenu,
    setExtraIcons,
    setRightComponent,
    setLoading,
    toggleRightDrawer,
    history
  }
}
