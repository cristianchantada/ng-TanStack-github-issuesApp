import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { State } from '../../interfaces/github-issue.interface';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent {

  public issue = input.required<GitHubIssue>();
  private issueService = inject(IssueService);

  get isOpen(){
    return this.issue().state === State.Open;
  }

  prefecthData(){

    // this.issueService.preFetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }

}
