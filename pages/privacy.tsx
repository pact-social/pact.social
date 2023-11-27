import Layout from "../components/layout";
import { markdownToHtml } from "../lib/mdUtils";

export default function Privacy() {
  const content = markdownToHtml(`
  # Personal Data Protection Policy

  To use the platform all functionalities are possible without providing any personal identifiable data.
  The only places where you would willingly and consciously provide us with personal data, are:
  - When you opt in to receive updates on a pact and the platform.
  - When you verify/authenticate your signature with email.
  
  The only personal information in this case is: your email address.
  So this privacy policy applies to this sole identifiable data.
  
  ## 1. INTRODUCTORY INFORMATION
  
  At pact.social we respect your right to privacy and take personal data protection extremely seriously, as we would like to provide you with the highest level of protection of the personal data that you have trusted us.
  
  This Policy is based on applicable relevant legislation on the protection of personal data, in particular the General Data Protection Regulation of the EU.
  
  In this Personal Data Protection Policy (hereinafter referred to as: Policy), we define ways of collecting your personal data, the purposes for which we collect it, the security measures we use to protect it, the persons with whom we share it, and your rights regarding the protection of personal data.
  
  ## 2. CONTROLLER OF PERSONAL DATA
  
  This Policy applies to all personal data processed by pact.social, a platform managed pact.social team. (company registration in process)  
  As a data controller, and only if you choose to share your eMail, pact.social shall be responsible for processing and storing of your personal data.  
  If you have any questions regarding the use of this Policy or with regards to the exercise of your rights arising from this Policy, please contact us at the following contact:
  - privacy at pact.social
  
  ## 3. POLICY USERS
  
  This Policy is for:
  - our users and
  - visitors of our platform.
  
  ## 4. TERMS AND DEFINITIONS
  
  Here you can find an explanation of the basic concepts that we use in our Policy.
  
  Each particular concept defined below has the meaning within this Policy as defined in this section.
  
  **Personal data** means any information that refers to a specific or identifiable individual (for example, the name, surname, e-mail address, telephone number and identifiers that are specific to the individual's physical, physiological, genetic, economic, mental, cultural or social identity, etc.).
  
  **Controller** means a legal entity that determines the purposes and means of processing of your personal data.
  
  **Processor** means a legal or natural person who processes personal data on behalf of the controller.
  
  **Processing** means collecting, storing, accessing and all other forms of use of personal data.
  
  **EEA** means the European Economic Area, which identifies all the Member States of the European Union, Iceland, Norway and Liechtenstein.
  
  **Member** is a legal or natural person registered on the Platform.
  
  **Pact** is the document a Member can create on pact.social. It could be a Petition, a Manifesto or an Open-Letter.
  
  **Pact's owner** is the creator of a Pact.
  
  **Pact's follower** is a member that opt-in to receive Pact's updates.
  
  **Signers** is a user who signs a Pact.
  
  **Signature** could be public or anon and encrypted
  
  **Collection** is a list of Pacts associated to a name
  
  ## 5. PROCESSING OF PERSONAL DATA
  
  At pact.social, we process your personal data solely on the basis of clearly stated and legitimate purposes, securely and transparently.
  
  We collect your personal data when you provide it to us: authenticating with eMail, signing up for our newsletter,  keeping informed about Pact’s updates, and inquiring by e-mail.
  
  We don’t collect cookies, but 3rd party providers, wallet connect or cloudflare may use them. Please refer to their respective Privacy Policy.  
  Cloudflare: [https://www.cloudflare.com/trust-hub/privacy-and-data-protection/](https://www.cloudflare.com/trust-hub/privacy-and-data-protection/)  
  WalletConnect : [https://walletconnect.com/privacy](https://walletconnect.com/privacy)  
  Mailjet : [https://www.mailjet.com/legal/privacy-policy/](https://www.mailjet.com/legal/privacy-policy/)  
    
  
  ### 4.1. What type of personal data do we collect?
  
  Your personal data can be obtained directly from you when you provide us with this information (for example, by logging into your member account, etc.). We can also obtain your personal data through the use of our services (e.g. pact’s updates, newsletter).
  
  |Category of personal data|Personal data collected|
  |---|---|
  |Identity data|eMail, Digital Wallet Information|
  |Contact data|eMail|
  
  
  At pact.social, we carefully protect the principle of the minimum amount of data provided by law, and therefore we collect only data that is appropriate, relevant and limited to what is necessary for the purposes for which the data is processed. The purposes for which we collect personal data are defined in Chapter 4.3. of this Policy.
  
  ### 4.2. On what legal basis do we collect and process your personal data
  
  In accordance with the legislation governing the protection of personal data, we may process your personal data on the following legal bases:
  - **Consent.** We process your personal data when you have given consent for the specific purposes of processing, and you are always entitled to revoke that consent;
  - **The law.** When processing is necessary for the fulfillment of legal obligations.
  
  *Is the provision of personal data mandatory?*
  
  The provision of personal data (eMail only) is mandatory only for eMail authentication, Pacts notification or newsletter subscription. In most cases, you provide us with personal data on a voluntary basis.
  Granting consent is always voluntary. However, in case of consent revocation or denial of consent, we will not be able to provide certain services.
  
  ### 4.3. Processing purposes
  
  pact.social will only process your data for specified, explicit and legitimate purposes. We undertake not to process your personal data in a manner incompatible with the purposes defined in this Policy.
  
  The purposes for which we can use your personal data are defined below. pact.social may use your personal data for one or more of the purposes identified below.
  
  Processing purposes related to user account management:
  
  | Processing purpose | Category of personal data processed | Legal basis |  
  |---|---|---|  
  | Registration of an account with eMail - become a member | E-mail (in the sole case of authentication by eMail) otherwise we don't process any personal data for registration. | Contractual relationship |  
  
  **Processing purposes related to usage of our platform:**
  
  |Processing purpose|Category of personal data processed|Legal basis|
  |---|---|---|
  |Create a Pact|owner’s member ID, Digital wallet information, Name, encrypted e-mail|Contractual relationship|
  |Create a Collection|owner’s member ID, Digital wallet information, Name, encrypted e-mail|Contractual relationship|
  |Signing a Pact|Signer’s member ID, Digital wallet information, Name, encrypted e-mail|Contractual relationship|
  
`)
  return (
    <Layout
      metas={{
        title: 'pact.social personal data protection policy'
      }}
    >
      <div className="flex justify-center my-12">
        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: content }}>
          </div>
        </div>
      </div>
    </Layout>
  )
}
