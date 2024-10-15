import { SortableContext } from '@dnd-kit/sortable'
import { NotesType, NoteType } from '../../../../types/NotesTypes'
import NoteCard from '../../../modules/NoteCard/NoteCard'

export default function NotesContainer({ notes }: { notes: NotesType }) {
    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5 sm:pb-6">
                    <SortableContext items={notes}>
                        {
                            notes.map((note: NoteType) => (
                                <NoteCard {...note} key={note.id} />
                            ))
                        }
                    </SortableContext>
                </div>
            </div>
        </section>
    )
}
