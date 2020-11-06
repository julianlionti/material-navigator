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
  drawerWidth?: number
  withSearch?: boolean
  showUser?: boolean
  userMenu?: UserMenuProps[]
  userIcon?: ReactNode
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

type NoRouteMenu = Omit<MenuProps, 'route'>
export interface UserMenuProps extends NoRouteMenu {
  id?: string
  keepOpen?: boolean
}

interface State extends SharedProps {
  drawer: boolean
  right?: boolean
}

type Action = { type: 'MENU'; open: boolean } | { type: 'TITLE'; title: string } | { type: 'RIGHT' }

interface ContextProps {
  state: State
  dispatch: Dispatch<Action>
}

const initialState = {
  drawer: false,
  drawerWidth: 240,
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

export const useNavigator = () => {
  const { state, dispatch } = useContext(NavigatorContext)

  const toggleMenu = useCallback(
    (open?: boolean) => dispatch({ type: 'MENU', open: open || !state.drawer }),
    [dispatch, state.drawer]
  )
  return { ...state, toggleMenu }
}
