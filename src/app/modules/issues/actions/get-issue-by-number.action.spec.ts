import { environment } from "src/environments/environment.development";
import { getIssueByNumber } from "./get-issue-by-number.action";

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;
const issueNumber = '123';

const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '# Hola Mundo !'
}

describe('GetIssueByNumber action', () => {

  it('should fetch issue successfully', async () => {

    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }
    });

  });

  it('should not fetch issue successfully', async () => {

    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);


    try {
      const issue = await getIssueByNumber(issueNumber);
      // Ponemos la prueba inferior que hará fallar el test, porque queremos asegurarnos de que nunca
      // se llame, ya que al hacer la llamada a getIsseByNUmber va a fallar la petición lanzarse un
      // error y caputarse en el expect del catch
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can not load issue ${issueNumber}`);
    }

    // expect(window.fetch).toHaveBeenCalledWith(requestURL, {
    //   headers: {
    //     Authorization: `Bearer ${GITHUB_TOKEN}`,
    //   }
    // });

  });

})