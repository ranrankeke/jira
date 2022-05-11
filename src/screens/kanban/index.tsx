import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useProjectInUrl } from './util'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: kanbans } = useKanbans()
  const { data: currentProject } = useProjectInUrl()
  console.log('kanbans',kanbans)
  console.log('currentProject',currentProject)
  return <div>
      <h1>{currentProject?.name}看板</h1>
      {
        kanbans?.map(kanban => {
          return <div key={kanban.id}>
            {kanban.name}
            </div>
        })
      }
  </div>
}