import dynamic from 'next/dynamic'

const CMS_CONFIG = {}
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-gray-500 font-semibold text-xl">Loading...</p>
  </div>
)

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
