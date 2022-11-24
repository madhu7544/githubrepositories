import './index.css'

const LanguageFilterItem = props => {
  const {languageData, filteredLanguage, selectedId} = props
  const {id, language} = languageData

  const getFilteredLanguage = () => {
    filteredLanguage(id)
  }

  const names = selectedId
    ? 'language-btn selected-language-btn'
    : 'language-btn'

  return (
    <li className="language-btn">
      <button className={names} type="button" onClick={getFilteredLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
