export type JobType = {
    image: string;
    jobType: string;
    name: string;
    type: string;
    location: string;
    desc: string;
    categories: string[];
}

export type optionType = {
    id: string;
    label: string;
}

export type filterFormType = {
    label: string;
    name: string;
    items: optionType[]
}