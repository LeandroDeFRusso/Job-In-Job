// Carregando Módulos
import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path'
import { initialize } from './dbconfig.js';
import candidato from './routes/candidato.js';
import candidatoModel from './models/Candidato.js';
import curriculoModel from './models/Curriculo.js';
import empresa from './routes/empresa.js';
import empresaModel from './models/Empresa.js';
import favoritoModel from './models/Favorito.js';
import experienciaModel from './models/Experiencia.js';
import formacaoModel from './models/Formacao.js';
import index from './routes/index.js';

const app = express();

app.use(methodOverride('_method'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
    //Sessão
    app.use(session({
        secret: 'fpowngiowngiowenio39823uiwenfiuhionfoifwenifewn',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    app.use(flash());
    
    //Middleware para passar as informações de sessão e flash para os arquivos views
    app.use((req, res, next) =>{
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.user = req.session.user; //Quando o usuário for de fato logado
        next();
    });

    // Middleware para parsear o body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Handlebars
    app.engine('handlebars', engine({
        helpers: {
            formatTelefone: function(telefone) {
                if (!telefone) return telefone;
    
                telefone = telefone.toString();
    
                if (telefone.length === 10) {
                    return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 6)}-${telefone.substring(6)}`;
                } else if (telefone.length === 11) {
                    return `(${telefone.substring(0, 2)}) ${telefone.substring(2, 7)}-${telefone.substring(7)}`;
                } else {
                    return telefone;
                }
            },
            formatCpf: function formatarCPF(cpf) {
                // Remove caracteres que não são dígitos
                cpf = cpf.replace(/\D/g, '');
            
                // Adiciona a formatação se o CPF tiver 11 dígitos
                if (cpf.length === 11) {
                    return cpf.replace(/(\d{3})(\d)/, '$1.$2') // 000.000
                               .replace(/(\d{3})(\d)/, '$1.$2') // 000.000.000
                               .replace(/(\d{3})(\d{2})$/, '$1-$2'); // 000.000.000-00
                }
            
                return cpf; // Retorna o CPF sem formatação se não tiver 11 dígitos
            }
            
        }
    }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));

    // Inicializa o pool de conexões do OracleDB
    async function initializeDatabase() {
        try {
            await initialize();
            console.log('Banco de dados conectado com sucesso.');
        } catch (error) {
            console.error('Erro ao inicializar o banco de dados:', error);
            process.exit(1);
        }
        candidatoModel.createCandidatoTable();
        curriculoModel.createCurriculoTable();
        experienciaModel.createExperienciaTable();
        formacaoModel.createFormacaoTable();
        empresaModel.createEmpresaTable();
        favoritoModel.createFavoritoTable();
    }

    // Arquivos estáticos
    app.use(express.static('public'));

// Rotas
    app.use('/', index)
    app.use('/candidato', candidato);
    app.use('/empresa', empresa);

// Servidor
const PORT = 8081;
app.listen(PORT, async () => {
    await initializeDatabase();
    console.log("Servidor rodando na porta 8081!");
});
