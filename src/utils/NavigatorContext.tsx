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

interface SharedProps {
  routes: RouteProps[]
  menu: MenuProps[]
  lang: Translations
}

interface ProviderProps extends SharedProps {
  children: ReactNode
}

export interface RouteProps {
  route: string
  component: ReactNode
}

export interface MenuProps {
  id: string
  title: string
}

interface State extends SharedProps {
  title?: string
  drawer: boolean
  right?: boolean
}

type Action =
  | { type: 'MENU'; open: boolean }
  | { type: 'TITLE'; title: string }
  | { type: 'RIGHT' }

interface ContextProps {
  state: State
  dispatch: Dispatch<Action>
}

const initialState = {
  drawer: false,
  menu: [],
  routes: [],
  lang: esAR
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
      console.log(action)
      return {
        ...state,
        title: action.title
      }
    default:
      return state
  }
}

export const NavigatorProvider = (props: ProviderProps) => {
  const { children, menu, routes, lang } = props
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    menu,
    routes,
    lang
  })

  return (
    <NavigatorContext.Provider value={{ state, dispatch }}>
      {children}
    </NavigatorContext.Provider>
  )
}

interface UseNavigatorProps {
  title: string
}

export const useLang = () => {
  const { state } = useContext(NavigatorContext)
  return state.lang
}

export const useNavigator = (props?: UseNavigatorProps) => {
  const { state, dispatch } = useContext(NavigatorContext)
  const { title } = props || {}

  useEffect(() => {
    if (title) {
      dispatch({ type: 'TITLE', title })
    }
  }, [dispatch, title])

  const toggleMenu = useCallback((open) => dispatch({ type: 'MENU', open }), [
    dispatch
  ])
  return { ...state, toggleMenu }
}
