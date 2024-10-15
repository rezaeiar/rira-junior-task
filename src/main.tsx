import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { NotesProvider } from './components/context/NoteContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // NotesProvider is a container for storing information at the top level of the page.
    <NotesProvider>
        <App />
    </NotesProvider>
)
