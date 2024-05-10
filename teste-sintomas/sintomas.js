function submitSymptoms() {
    var symptomsForm = document.getElementById("symptom-test");
    var symptoms = symptomsForm.elements["symptom"];
    var selectedSymptoms = [];

    for (var i = 0; i < symptoms.length; i++) {
        if (symptoms[i].checked) {
            selectedSymptoms.push(symptoms[i].value);
        }
    }

    var resultContainer = document.getElementById("result");
    if (selectedSymptoms.length === 0) {
        resultContainer.innerHTML = "<p>Por favor, selecione pelo menos um sintoma.</p>";
    } else {
        resultContainer.innerHTML = "<p>Você selecionou os seguintes sintomas:</p><ul>";
        for (var j = 0; j < selectedSymptoms.length; j++) {
            resultContainer.innerHTML += "<li>" + selectedSymptoms[j] + "</li>";
        }
        resultContainer.innerHTML += "</ul>";
    }
}
function submitSymptoms() {
    var symptomsForm = document.getElementById("symptom-test");
    var symptoms = symptomsForm.elements["symptom"];
    var selectedSymptoms = [];

    for (var i = 0; i < symptoms.length; i++) {
        if (symptoms[i].checked) {
            selectedSymptoms.push(symptoms[i].value);
        }
    }

    var resultContainer = document.getElementById("result");
    if (selectedSymptoms.length === 0) {
        resultContainer.innerHTML = "<p>Por favor, selecione pelo menos um sintoma.</p>";
    } else {
        resultContainer.innerHTML = "<p>Você selecionou os seguintes sintomas:</p><ul>";
        for (var j = 0; j < selectedSymptoms.length; j++) {
            resultContainer.innerHTML += "<li>" + selectedSymptoms[j] + "</li>";
        }
        resultContainer.innerHTML += "</ul>";

        // Verificar se os sintomas indicam a necessidade de procurar uma UBS
        var urgentSymptoms = ["Febre", "Falta de Ar"];
var selectedSymptoms = ["Febre", "Tosse", "Falta de Ar"]; // Exemplo de sintomas selecionados
var needsAttention = false;
var selectedCount = 0;

for (var k = 0; k < selectedSymptoms.length; k++) {
    if (urgentSymptoms.includes(selectedSymptoms[k])) {
        needsAttention = true;
    }
    selectedCount++;
}

if (selectedCount > 3) {
    // Aqui você pode fazer o que precisa quando mais de 3 opções são selecionadas
    console.log("Mais de 3 opções selecionadas!");
}

if (needsAttention) {
    // Aqui você pode fazer o que precisa quando sintomas urgentes são selecionados
    console.log("Sintomas urgentes selecionados!");
}

        }

if (needsAttention) {
       resultContainer.innerHTML += "<p><strong>Por favor, procure uma Unidade Básica de Saúde (UBS) o mais rápido possível para avaliação.</strong></p>";
        }
    }

