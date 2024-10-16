// use core::starknet::storage::Map;
use core::starknet::ContractAddress;

#[starknet::interface]
pub trait IInnov8Pulse<TContractState> {
    fn submit_project(
        ref self: TContractState, project_id: felt252, project_name: felt252, description: felt252
    );
    fn get_project(self: @TContractState, project_id: felt252) -> Innov8Pulse::Project;
    fn track_contribution(
        ref self: TContractState,
        project_id: felt252,
        contributor: ContractAddress,
        contribution: felt252
    );
    fn provide_feedback(
        ref self: TContractState, project_id: felt252, feedback: felt252, mentor: ContractAddress
    );
    fn get_all_projects(self: @TContractState);
}

#[starknet::contract]
mod Innov8Pulse {
    use starknet::storage::StoragePathEntry;
    use core::starknet::{ContractAddress, get_caller_address};
    use core::starknet::storage::{Map, StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        projects: Map::<felt252, Project>,
        project_ids: Map::<u128, felt252>, // Simulate an array with Map using index
        contributions: Map::<
            felt252, Map<ContractAddress, felt252>
        >, // project_id => contributor => contribution
        feedbacks: Map::<
            felt252, Map<ContractAddress, felt252>
        >, // project_id => mentor => feedback
        total_projects: u128,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        ProjectSubmitted: ProjectSubmitted,
        ContributionTracked: ContributionTracked,
        FeedbackProvided: FeedbackProvided,
        AllProjectsRetrieved: AllProjectsRetrieved,
    }

    #[derive(Drop, starknet::Event)]
    struct ProjectSubmitted {
        #[key]
        project_id: felt252,
        project_name: felt252,
        description: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct ContributionTracked {
        #[key]
        project_id: felt252,
        contributor: ContractAddress,
        contribution: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct FeedbackProvided {
        #[key]
        project_id: felt252,
        mentor: ContractAddress,
        feedback: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct AllProjectsRetrieved {
        #[key]
        project_id: felt252,
        project_name: felt252,
        description: felt252,
        owner: ContractAddress,
    }

    #[derive(Drop, Serde, starknet::Store)]
    pub struct Project {
        project_id: felt252,
        project_name: felt252,
        description: felt252,
        owner: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl Implnnov8Pulse of super::IInnov8Pulse<ContractState> {
        fn submit_project(
            ref self: ContractState,
            project_id: felt252,
            project_name: felt252,
            description: felt252
        ) {
            let caller = get_caller_address();

            let project = Project {
                project_id: project_id,
                project_name: project_name,
                description: description,
                owner: caller,
            };

            self.projects.entry(project_id).write(project);

            // Store the project ID in the project_ids map using the total_projects as an index
            let index = self.total_projects.read();
            self.project_ids.entry(index).write(project_id);

            self.total_projects.write(index + 1);

            // Emit the project submitted event
            ProjectSubmitted {
                project_id: project_id,
                project_name: project_name,
                description: description,
            };
        }

        fn get_project(self: @ContractState, project_id: felt252) -> Project {
            self.projects.entry(project_id).read()
        }

        fn track_contribution(
            ref self: ContractState,
            project_id: felt252,
            contributor: ContractAddress,
            contribution: felt252
        ) {
            let mut project_contributions = self.contributions.entry(project_id);

            project_contributions.entry(contributor).write(contribution);

            // Emit the contribution tracked event
            ContributionTracked {
                project_id: project_id,
                contributor: contributor,
                contribution: contribution,
            };
        }

        fn provide_feedback(
            ref self: ContractState, project_id: felt252, feedback: felt252, mentor: ContractAddress
        ) {
            let mut project_feedbacks = self.feedbacks.entry(project_id);

            project_feedbacks.entry(mentor).write(feedback);

            // Emit the feedback provided event
            FeedbackProvided { 
                project_id: project_id, 
                mentor: mentor, 
                feedback: feedback, 
            };
        }

        fn get_all_projects(self: @ContractState) {
            let project_count = self.total_projects.read();

            // Loop through the project_ids map and emit all projects as events
            for i in 0..project_count {
                let project_id = self.project_ids.entry(i).read();
                let project = self.projects.entry(project_id).read();

                // Emit event for each project
                AllProjectsRetrieved {
                    project_id: project.project_id,
                    project_name: project.project_name,
                    description: project.description,
                    owner: project.owner,
                };
            }
        }
    }
}
