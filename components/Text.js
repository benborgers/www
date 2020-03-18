export default ({ children }) => {
  return (
    <>
      <p>
        {children}
      </p>

      <style jsx>{`
        font-size: 20px;
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 10px;
      `}</style>
    </>
  )
}