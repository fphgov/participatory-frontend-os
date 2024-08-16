import {FC} from "react";
import Link from "next/link";
import styles from '../../styles/components/map/VotePopUp.module.scss';
import VoteButtonCard from "@/components/vote/VoteButtonCard";

export interface VotePopUpProps {
  project: any
  token: any
  ready: boolean
  voteStatus: any
}

const VotePopUp: FC<VotePopUpProps> = ({ project, token, ready, voteStatus }) => {
  return (
    <div className={styles.vote_pop_up}>
      <div className={styles.campaign_theme}>
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M8.99977 12.9018C10.6511 12.9018 11.9898 11.5062 11.9898 9.78453C11.9898 8.06289 10.6511 6.66724 8.99977 6.66724C7.34843 6.66724 6.00977 8.06289 6.00977 9.78453C6.00977 11.5062 7.34843 12.9018 8.99977 12.9018Z"
              fill="#23A8CC"/>
            <path
              d="M8.99988 3.11729C9.82555 3.11729 10.4949 2.41946 10.4949 1.55864C10.4949 0.697829 9.82555 0 8.99988 0C8.17422 0 7.50488 0.697829 7.50488 1.55864C7.50488 2.41946 8.17422 3.11729 8.99988 3.11729Z"
              fill="#23A8CC"/>
            <path
              d="M1.495 8.79917C2.32067 8.79917 2.99 8.10135 2.99 7.24053C2.99 6.37971 2.32067 5.68188 1.495 5.68188C0.669334 5.68188 0 6.37971 0 7.24053C0 8.10135 0.669334 8.79917 1.495 8.79917Z"
              fill="#23A8CC"/>
            <path
              d="M4.36023 18.0001C5.1859 18.0001 5.85523 17.3023 5.85523 16.4415C5.85523 15.5806 5.1859 14.8828 4.36023 14.8828C3.53457 14.8828 2.86523 15.5806 2.86523 16.4415C2.86523 17.3023 3.53457 18.0001 4.36023 18.0001Z"
              fill="#23A8CC"/>
            <path
              d="M13.64 18.0001C14.4657 18.0001 15.135 17.3023 15.135 16.4415C15.135 15.5806 14.4657 14.8828 13.64 14.8828C12.8144 14.8828 12.145 15.5806 12.145 16.4415C12.145 17.3023 12.8144 18.0001 13.64 18.0001Z"
              fill="#23A8CC"/>
            <path
              d="M16.5048 8.79917C17.3304 8.79917 17.9998 8.10135 17.9998 7.24053C17.9998 6.37971 17.3304 5.68188 16.5048 5.68188C15.6791 5.68188 15.0098 6.37971 15.0098 7.24053C15.0098 8.10135 15.6791 8.79917 16.5048 8.79917Z"
              fill="#23A8CC"/>
          </svg>
        </div>
        <div className={styles.name}>{project.campaign_theme.name}</div>
      </div>
      <div className={styles.title}>
        {project.title}
      </div>
      <div className={styles.buttons}>
        <VoteButtonCard
          showVoteButton={!project.voted && !ready}
          disableVoteButton={false}
          errorVoteable={""}
          token={token}
          projectId={project.id}
          voteStatus={voteStatus}
        />
        <Link href={`/projektek/${project.id}`} className="btn post-more post-more-outline">Megnézem</Link>
      </div>
      {!project.voted ? null :
        <div className={styles.voted}>
          <p className={styles.voted_label}>
            <div className="prop-build">Már szavaztál erre az ötletre</div>
          </p>
        </div>
      }
    </div>
  );
};

export default VotePopUp;
