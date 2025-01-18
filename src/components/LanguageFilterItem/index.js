// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {optionItem, filterItem, activeId} = props
  const {id, language} = optionItem
  const changeActiveId = () => {
    filterItem(id)
  }

  return (
    <li className="languageItem">
      <button
        type="button"
        className={activeId === id ? 'activeLanguageButton' : 'languageButton'}
        onClick={changeActiveId}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
