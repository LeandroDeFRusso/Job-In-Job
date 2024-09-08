document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('email').value;
    const data_nascimento = document.getElementById('data_nascimento').value;
    const senha = document.getElementById('senha').value;

    const addressData = {
        nome,
        cpf,
        data_nascimento,
        senha
    };

    try {
        const response = await fetch('http://localhost:8080/api/candidato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressData)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').innerText = 'Endereço enviado com sucesso!';
            document.getElementById('formulario').reset();
        } else {
            document.getElementById('message').innerText = `Erro: ${result.message}`;
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Erro na comunicação com o servidor.';
    }
})