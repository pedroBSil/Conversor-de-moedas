// Objeto que mapeia códigos de moeda para seus símbolos correspondentes
const currencySymbols = {
    AED:'د.إ',   // Dirham dos Emirados Árabes Unidos
    ARS:'$',      //Peso Argentino
    AUD:'$',     // Dólar Australiano
    CZK:'Kč',    // Coroa Tcheca
    EUR:'€',     // Euro
    GBP:'£',     // Libra Esterlina
    JPY:'¥',     // Iene Japonês
    USD: '$',    // Dólar Americano
    RUB: '₽',    // rublo russo
};

// Função para converter uma quantia de dinheiro de reais brasileiros para outra moeda
function convertCurrency() {
    // Obtendo elementos do DOM
    const amountInput = document.getElementById('amount');
    const currencySelect = document.getElementById('currency');
    const resultParagraph = document.getElementById('result');

    // Obtendo valores de entrada
    const amount = parseFloat(amountInput.value);
    const currency = currencySelect.value;

    // URL da API de taxa de câmbio
    const apiUrl = 'https://v6.exchangerate-api.com/v6/9493cbb017995d6344f834e1/latest/brl';

    // Chamando a API usando Fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Obtendo a taxa de câmbio para a moeda de destino
            const exchangeRate = data.conversion_rates[currency];
            
            // Verificando se a taxa de câmbio foi obtida com sucesso
            if (exchangeRate) {
                // Calculando o valor convertido e exibindo na página
                const convertedAmount = amount * exchangeRate;
                const symbol = currencySymbols[currency] || currency;
                resultParagraph.innerHTML = `${amount.toFixed(2)} R$ é equivalente a ${symbol} ${convertedAmount.toFixed(2)}`;
            } else {
                // Exibindo mensagem de erro se a taxa de câmbio não foi obtida
                resultParagraph.innerHTML = 'Erro ao obter taxa de câmbio para a moeda selecionada.';
            }
        })
        .catch(error => {
            // Tratando erros durante a chamada da API
            console.error('Erro ao obter dados da API:', error);
            resultParagraph.innerHTML = 'Erro ao converter moeda. Tente novamente mais tarde.';
        });
}
