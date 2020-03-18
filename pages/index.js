import Page from "../components/Page"
import Text from "../components/Text"
import Nav from "../components/Nav"

export default () => {
  return (
    <>
      <Page
        header={false}
        heading="Ben Borgers"
        description="I'm a 17 year old programmer from Boston, MA. Summer intern at IBM for 2019 and 2020. This site holds a list of my projects and my blog."
      >
        <Text>
          I'm a 17 year old programmer from Boston, MA. 
        </Text>

        <Text>
          Summer intern at <a href="https://www.ibm.com/security/data-security/guardium">IBM</a> for 2019 and 2020.
        </Text>

        <Nav social={true} />
      </Page>
    </>
  )
}