import React, { memo } from 'react'
import { Translations } from '../translate'
import { esAR } from '../translate/es_AR'
import { NavigatorProvider, SharedProps } from '../utils/NavigatorContext'
import Navigator from './Navigator'

type WithoutLang = Omit<SharedProps, 'lang'>
interface Props extends WithoutLang {
  lang?: Translations
}

export default memo((props: Props) => {
  const { lang, ...restProps } = props
  return (
    <NavigatorProvider lang={lang || esAR} {...restProps}>
      <Navigator />
    </NavigatorProvider>
  )
})
