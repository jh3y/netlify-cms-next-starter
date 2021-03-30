import dynamic from 'next/dynamic'

const CMS_CONFIG = {}
const Loading = () => <p>Loading...</p>

const CMS = dynamic(
  () =>
    import('netlify-cms-app').then((CMS) => {
      CMS.init({ CMS_CONFIG })
    }),
  { ssr: false, loading: Loading }
)

const Admin = () => {
  return <CMS />
}
export default Admin
