import * as v from 'valibot';
import { Equipment } from './equipment';

async function isTeamNameUnique(teamName: string): Promise<boolean> {
  const existingTeams = ['Team Alpha', 'Team Beta', 'Team Gamma'];
  await new Promise((resolve) => setTimeout(resolve, 1500)); //artificial delay
  return !existingTeams.includes(teamName);
}

export const departments = ['Development', 'Marketing', 'Sales', 'Support'];

const TeamNameSchema = v.pipeAsync(
  v.nonNullish(v.string(), 'Team name is required'),
  v.trim(),
  v.nonEmpty('Please enter a team name'),
  v.minLength(3, 'Name must be at least 3 characters'),
  v.checkAsync(isTeamNameUnique, 'This name is already in use'),
);

const DepartmentSchema = v.pipe(
  v.union(
    departments.map((department) => v.literal(department)),
    'Department is required',
  ),
);

const ContractPeriodSchema = v.pipe(
  v.strictObject({
    start: v.nonNullish(
      v.date('Invalid contract start date'),
      'Start date is required',
    ),
    end: v.nonNullish(
      v.date('Invalid contract end date'),
      'End date is required',
    ),
  }),
  v.check(
    ({ start, end }) => start < end,
    'Contract end date must be after start',
  ),
);

const EquipmentSchema = v.enum(Equipment);

const TeamMemberSchema = v.object({
  name: v.pipe(
    v.nonNullish(v.nullish(v.string()), 'Name is required'),
    v.trim(),
    v.nonEmpty('Please enter a name'),
  ),
  age: v.nonNullish(
    v.nullable(v.pipe(v.number(), v.minValue(18, 'Age must be at least 18'))),
    'Age is required',
  ),
});

export const TeamSchema = v.objectAsync({
  teamName: TeamNameSchema,
  department: DepartmentSchema,
  contractPeriod: ContractPeriodSchema,
  requiredEquipment: v.pipe(
    v.nullish(v.array(EquipmentSchema), []),
    v.minLength(1, 'Team must have at least 1 piece of equipment'),
  ),
  members: v.pipe(
    v.nullish(v.record(v.string(), TeamMemberSchema), {}),
    v.check(
      (members) => Object.entries(members).length > 0,
      'Team must have at least 1 member',
    ),
  ),
});

export type Team = v.InferOutput<typeof TeamSchema>;
