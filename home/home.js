// Função assíncrona para obter o timestamp da última atualização da API
async function getLastUpdatedTimestamp() {
    // Faz uma requisição assíncrona para a API
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    // Aguarda a resposta e extrai os dados JSON
    const data = await response.json();
    // Retorna o timestamp da última atualização
    return data.updated;
}

// Obtém o timestamp da última atualização e atualiza o rodapé da página
getLastUpdatedTimestamp()
    .then(timestamp => {
        // Formata o timestamp para exibir no formato de data e hora local
        const formattedTimestamp = new Date(timestamp).toLocaleString('pt-BR');
        // Atualiza o elemento HTML com o timestamp formatado
        document.getElementById('updatedTimestamp').textContent = `Última atualização da API: ${formattedTimestamp}`;
    })
    .catch(error => console.error('Error:', error));
