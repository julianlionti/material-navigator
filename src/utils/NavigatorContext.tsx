import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { Translations } from '../translate'
import { esAR } from '../translate/es_AR'

export interface SharedProps {
  routes: RouteProps[]
  menu: MenuProps[]
  lang: Translations
  title: string
  withSearch?: boolean
  showUser?: boolean
  userMenu?: UserMenuProps[]
  userIcon?: ReactNode
  extraIcons?: IconsProps[]
  menuDrawerWidth?: number
  rightDrawerWidth?: number
  rightComponent?: () => ReactNode
}

interface ProviderProps extends SharedProps {
  children: ReactNode
}

export interface RouteProps {
  route: string
  component: ReactNode
}

export interface MenuProps {
  route?: string
  title?: string
  icon?: ReactNode
  description?: string
  onPress?: () => void
  hidden?: boolean
}

export interface IconsProps {
  id: string
  icon: ReactNode
  badgeCount?: number
  tooltip?: string
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
  | { type: 'TITLE'; title: string }
  | { type: 'RIGHT'; open: boolean }
  | { type: 'RIGHTCOMPONENT'; component: () => ReactNode }
  | { type: 'EXTRAICONS'; extraIcons: IconsProps[] }

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
  title: 'Material Navigator'
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
    case 'TITLE':
      return {
        ...state,
        title: action.title
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
    default:
      return state
  }
}

export const NavigatorProvider = (props: ProviderProps) => {
  const { children, ...providerProps } = props
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...providerProps })

  return (
    <NavigatorContext.Provider value={{ state, dispatch }}>{children}</NavigatorContext.Provider>
  )
}

export const useLang = () => {
  const { state } = useContext(NavigatorContext)
  return state.lang
}

interface UseTitleProps {
  title: string
}

export const useTitle = (props: UseTitleProps) => {
  const { dispatch } = useContext(NavigatorContext)
  const { title } = props || {}

  useEffect(() => {
    if (title) {
      dispatch({ type: 'TITLE', title })
    }
  }, [dispatch, title])
}

type SetExtraActionsProps = (extraActions: IconsProps[]) => IconsProps[]

export const useNavigator = () => {
  const { state, dispatch } = useContext(NavigatorContext)

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

  return { ...state, toggleMenu, setExtraIcons, setRightComponent, toggleRightDrawer }
}
