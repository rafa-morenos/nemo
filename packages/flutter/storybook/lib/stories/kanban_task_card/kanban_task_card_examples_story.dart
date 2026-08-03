import 'package:flutter/material.dart';
import 'package:nemo_flutter/kanban_task_card.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

Widget _fixedWidth(Widget child) => SizedBox(width: 420, child: child);

Story kanbanTaskCardStory(String name) => Story(
  name: name,
  builder: (context) => _fixedWidth(
    const KanbanTaskCard(
      title: 'Fazer inventário da loja',
      description:
          'Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos.',
      tasksLabel: '3 Tarefas',
      timeLeft: '3 horas restantes',
      progressDone: 0,
      progressTotal: 3,
      tasks: [
        TaskItem(
          title: 'Contar bebidas',
          description: 'Corredor 3',
          status: TaskStatus.done,
          checked: true,
        ),
        TaskItem(
          title: 'Conferir hortifruti',
          description: 'Câmara fria',
          status: TaskStatus.todo,
        ),
        TaskItem(
          title: 'Repor limpeza',
          description: 'Estoque',
          status: TaskStatus.canceled,
          disabled: true,
        ),
      ],
      assignees: ['Ulisses Camilo', 'Gabriel Fuentes'],
      updatedLabel: 'Atualizado há um dia',
    ),
  ),
);

Story kanbanTaskCardCollapsedStory(String name) => Story(
  name: name,
  builder: (context) => _fixedWidth(
    const KanbanTaskCard(
      collapsed: true,
      title: 'Fazer inventário da loja',
      description:
          'Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos.',
    ),
  ),
);
