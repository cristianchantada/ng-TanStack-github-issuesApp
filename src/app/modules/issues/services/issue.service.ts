import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';
import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string|null>(null);
  private queryClient = injectQueryClient();

  public issueQuery = injectQuery( () => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  public issueCommentsQuery = injectQuery( () => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber( issueNumber: string){
    this.issueNumber.set(issueNumber);
  }

  // Método prefetch que utiliza las mismas queryKey y queryFn que la query "issueQuery"
  preFetchIssue(issueNumber: string){
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssueByNumber(issueNumber),
      staleTime: 1000 * 60 * 5,
    })
  }

  // setQueryData() Nos sirve para decirle a TanStack que si tiene ya la data, no haga la petición y establecérsela
  setIssueData( issue: GitHubIssue){
    this.queryClient.setQueryData(
      ['issue', issue.number.toString()],
      issue,
      {updatedAt: Date.now() + 1000 * 60},
    )
  }

}
