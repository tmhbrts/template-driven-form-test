import * as v from 'valibot';
import { Equipment } from './equipment';

async function isTeamNameUnique(teamName: string): Promise<boolean> {
  const existingTeams = ['Team Alpha', 'Team Beta', 'Team Gamma'];
  await new Promise((resolve) => setTimeout(resolve, 1500)); //artificial delay
  return !existingTeams.includes(teamName);
}

export const departments = ['Development', 'Marketing', 'Sales', 'Support'];

const TeamNameSchema = v.pipeAsync(
  v.string(),
  v.minLength(3, 'Name must be at least 3 characters'),
  v.checkAsync(isTeamNameUnique, 'Name must be unique'),
);

const DepartmentSchema = v.union(
  departments.map((department) => v.literal(department)),
);

const EquipmentSchema = v.enum(Equipment);

const TeamMemberSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Name must be at least 2 characters'),
  ),
  age: v.pipe(v.number(), v.minValue(18, 'Age must be at least 18')),
});

export const TeamSchema = v.pipeAsync(
  v.objectAsync({
    teamName: TeamNameSchema,
    department: DepartmentSchema,
    contractPeriodStart: v.optional(v.date()),
    contractPeriodEnd: v.optional(v.date()),
    requiredEquipment: v.array(EquipmentSchema),
    members: v.pipe(
      v.array(TeamMemberSchema),
      v.minLength(1, 'Team must have at least 1 member'),
    ),
  }),
  v.check((team) => {
    if (team.contractPeriodStart && team.contractPeriodEnd) {
      return team.contractPeriodEnd > team.contractPeriodStart;
    }
    return true;
  }, 'Contract end must be after contract start'),
);

export type Team = v.InferOutput<typeof TeamSchema>;
