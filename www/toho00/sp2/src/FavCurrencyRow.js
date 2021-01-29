import React from 'react'

export default function FavCurrencyRow(props) {
    const {
        favCurrencyOptions,
        selectedFavCurrency,
        onChangeFavCurrency
    } = props
    return (
        <div>


            <select value={selectedFavCurrency} onChange={onChangeFavCurrency}>
                {favCurrencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}

            </select>
        </div>
    )
}
