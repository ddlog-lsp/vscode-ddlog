/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const { include } = basis;

const Rx = {
  pat: {
    // pat_cons: \\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[A-Z][a-zA-Z0-9_]*\\b
    // pat_term_decl_var: var\b|\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[a-z_][a-zA-Z0-9_]*\\b
    // pat_lit: false\\b|true\\b|[0-9]\\b|"
    // pat_tuple: \\(
    // pat_type: <recursive>
    // pat_wild: _\\b
    lookahead: `(_|false|true|var|[0-9])\\b|"|\\(|\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[a-zA-Z_][a-zA-Z0-9_]*\\b`,
  },
  ident: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b",
  ident_lower: "\\b[a-z_][a-zA-Z0-9_]*\\b",
  ident_lower_scoped: "\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[a-z_][a-zA-Z0-9_]*\\b",
  ident_scoped: "\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[a-zA-Z_][a-zA-Z0-9_]*\\b",
  ident_upper: "\\b[A-Z][a-zA-Z0-9_]*\\b",
  ident_upper_scoped: "\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[A-Z][a-zA-Z0-9_]*\\b",
  item: {
    // statement_for: for\\b
    // apply: apply\\b
    // import: import\\b
    // function: extern\\b|function\\b
    // index: index\\b
    // rel: input\\b|internal\\b|output\\b|&|\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[a-zA-Z_][a-zA-Z0-9_]*\\b
    // rule: <combined with rel>
    // transformer: <combined with function>
    // typedef: typedef\\b
    lookahead:
      "(apply|extern|f(or|unction)|i(mport|n(dex|put|ternal))|output|typedef)\\b|\\b([a-zA-Z_][a-zA-Z0-9_]*\\s*::\\s*)*[a-zA-Z_][a-zA-Z0-9_]*\\b",
  },
  lit_num_bin: "[0-1][0-1_]*",
  lit_num_dec: "[0-9][0-9_]*",
  lit_num_float: "[0-9][0-9_]*(\\.[0-9][0-9_]*)?([eE][+-]?[0-9][0-9_]*)?",
  lit_num_hex: "[0-9a-fA-F][0-9a-fA-F_]*",
  lit_num_oct: "[0-7][0-7_]*",
  name_var_type: "'[A-Z][a-zA-Z0-9_]*",
  statement_end: {
    lookbehind: "skip|\\}",
  },
};

export class DDlogDl implements basis.Render {
  constructor() {
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "DDlog Program",
      scopeName: "source.ddlog.dl",
      fileTypes: [".dl"],
      patterns: [include(this.comment), include(this.EXTRAS), include(this.ROOT)],
      repository: {
        EXTRAS: this.EXTRAS(),
        ROOT: this.ROOT(),
        annotated_item: this.annotated_item(),
        apply: this.apply(),
        arg: this.arg(),
        arg_opt_type: this.arg_opt_type(),
        arg_trans: this.arg_trans(),
        atom: this.atom(),
        attribute: this.attribute(),
        attributes: this.attributes(),
        comment: this.comment_block(),
        comment_block: this.comment_block(),
        comment_line: this.comment_line(),
        cons: this.cons(),
        escape_sequence: this.escape_sequence(),
        escape_sequence_interpolated: this.escape_sequence_interpolated(),
        exp: this.exp(),
        exp_add: this.exp_add(),
        exp_assign: this.exp_assign(),
        exp_binding: this.exp_binding(),
        exp_bit_and: this.exp_bit_and(),
        exp_bit_neg: this.exp_bit_neg(),
        exp_bit_or: this.exp_bit_or(),
        exp_bit_slice: this.exp_bit_slice(),
        exp_bit_xor: this.exp_bit_xor(),
        exp_block: this.exp_block(),
        exp_break: this.exp_break(),
        exp_cast: this.exp_cast(),
        exp_cat: this.exp_cat(),
        exp_cond: this.exp_cond(),
        exp_cons_pos: this.exp_cons_pos(),
        exp_cons_rec: this.exp_cons_rec(),
        exp_continue: this.exp_continue(),
        exp_decl_var: this.exp_decl_var(),
        exp_div: this.exp_div(),
        exp_eq: this.exp_eq(),
        exp_field: this.exp_field(),
        exp_for: this.exp_for(),
        exp_fun_call: this.exp_fun_call(),
        exp_fun_call_dot: this.exp_fun_call_dot(),
        exp_gt: this.exp_gt(),
        exp_gteq: this.exp_gteq(),
        exp_lambda: this.exp_lambda(),
        exp_lambda_branch_0: this.exp_lambda_branch_0(),
        exp_lambda_branch_1: this.exp_lambda_branch_1(),
        exp_lit: this.exp_lit(),
        exp_log_and: this.exp_log_and(),
        exp_log_imp: this.exp_log_imp(),
        exp_log_neg: this.exp_log_neg(),
        exp_log_or: this.exp_log_or(),
        exp_lt: this.exp_lt(),
        exp_lteq: this.exp_lteq(),
        exp_match: this.exp_match(),
        exp_match_arm: this.exp_match_arm(),
        exp_mul: this.exp_mul(),
        exp_neg: this.exp_neg(),
        exp_neq: this.exp_neq(),
        exp_proj: this.exp_proj(),
        exp_ref: this.exp_ref(),
        exp_rem: this.exp_rem(),
        exp_return: this.exp_return(),
        exp_seq: this.exp_seq(),
        exp_shl: this.exp_shl(),
        exp_shr: this.exp_shr(),
        exp_slice: this.exp_slice(),
        exp_sub: this.exp_sub(),
        exp_try: this.exp_try(),
        exp_tuple: this.exp_tuple(),
        exp_type: this.exp_type(),
        exp_wild: this.exp_wild(),
        extern_function_transformer_typedef: this.extern_function_transformer_typedef(),
        field: this.field(),
        function_normal: this.function_normal(),
        function_normal_branch_0: this.function_normal_branch_0(),
        function_normal_branch_1: this.function_normal_branch_1(),
        import: this.import(),
        index: this.index(),
        interpolation: this.interpolation(),
        item: this.item(),
        key_primary: this.key_primary(),
        lit_bool: this.lit_bool(),
        lit_map: this.lit_map(),
        lit_num: this.lit_num(),
        lit_num_branch_0: this.lit_num_branch_0(),
        lit_num_branch_1: this.lit_num_branch_1(),
        lit_num_branch_10: this.lit_num_branch_10(),
        lit_num_branch_11: this.lit_num_branch_11(),
        lit_num_branch_12: this.lit_num_branch_12(),
        lit_num_branch_13: this.lit_num_branch_13(),
        lit_num_branch_14: this.lit_num_branch_14(),
        lit_num_branch_15: this.lit_num_branch_15(),
        lit_num_branch_16: this.lit_num_branch_16(),
        lit_num_branch_17: this.lit_num_branch_17(),
        lit_num_branch_18: this.lit_num_branch_18(),
        lit_num_bin: this.lit_num_bin(),
        lit_num_dec: this.lit_num_dec(),
        lit_num_float: this.lit_num_float(),
        lit_num_hex: this.lit_num_hex(),
        lit_num_oct: this.lit_num_oct(),
        lit_string: this.lit_string(),
        lit_vec: this.lit_vec(),
        module_path: this.module_path(),
        name: this.name(),
        name_arg: this.name_arg(),
        name_cons: this.name_cons(),
        name_field: this.name_field(),
        name_func: this.name_func(),
        name_index: this.name_field(),
        name_rel: this.name_rel(),
        name_trans: this.name_trans(),
        name_type: this.name_type(),
        name_var_term: this.name_var_term(),
        name_var_type: this.name_var_type(),
        pat: this.pat(),
        pat_cons: this.pat_cons(),
        pat_cons_pos: this.pat_cons_pos(),
        pat_cons_rec: this.pat_cons_rec(),
        pat_lit: this.pat_lit(),
        pat_term_decl_var: this.pat_term_decl_var(),
        pat_tuple: this.pat_tuple(),
        pat_type: this.pat_type(),
        pat_wild: this.pat_wild(),
        rel: this.rel(),
        rel_role: this.rel_role(),
        rel_semantics: this.rel_semantics(),
        rhs: this.rhs(),
        rhs_atom_neg: this.rhs_atom_neg(),
        rhs_flat_map: this.rhs_flat_map(),
        rhs_grouping: this.rhs_grouping(),
        rhs_inspect: this.rhs_inspect(),
        rule: this.rule(),
        rule_end: this.rule_end(),
        statement: this.statement(),
        statement_assign: this.statement_assign(),
        statement_block: this.statement_block(),
        statement_empty: this.statement_empty(),
        statement_for: this.statement_for(),
        statement_if: this.statement_if(),
        statement_insert: this.statement_insert(),
        statement_match: this.statement_match(),
        statement_match_arm: this.statement_match_arm(),
        string_quoted: this.string_quoted(),
        string_quoted_branch_0: this.string_quoted_branch_0(),
        string_quoted_branch_1: this.string_quoted_branch_1(),
        string_quoted_escaped_branch_0: this.string_quoted_escaped_branch_0(),
        string_quoted_escaped_branch_1: this.string_quoted_escaped_branch_1(),
        string_raw_interpolated: this.string_raw_interpolated(),
        string_raw_interpolated_branch_0: this.string_raw_interpolated_branch_0(),
        string_raw_interpolated_branch_1: this.string_raw_interpolated_branch_1(),
        transformer: this.transformer(),
        type: this.type(),
        type_atom: this.type_atom(),
        type_bigint: this.type_bigint(),
        type_bit: this.type_bit(),
        type_bool: this.type_bool(),
        type_double: this.type_double(),
        type_float: this.type_float(),
        type_fun: this.type_fun(),
        type_fun_branch_0: this.type_fun_branch_0(),
        type_fun_branch_1: this.type_fun_branch_1(),
        type_signed: this.type_signed(),
        type_string: this.type_string(),
        type_trans: this.type_trans(),
        type_trans_fun: this.type_trans_fun(),
        type_trans_rel: this.type_trans_rel(),
        type_tuple: this.type_tuple(),
        type_union: this.type_union(),
        type_user: this.type_user(),
        type_var: this.type_var(),
        typedef_normal: this.typedef_normal(),
      },
    };
  }

  EXTRAS(): schema.Rule {
    return {
      patterns: [include(this.comment_block), include(this.comment_line)],
    };
  }

  ROOT(): schema.Rule {
    return {
      patterns: [include(this.annotated_item)],
    };
  }

  annotated_item(): schema.Rule {
    return {
      patterns: [include(this.item)],
    };
  }

  apply(): schema.Rule {
    return {
      begin: "\\bapply\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "storage.type.apply.ddlog.dl",
        },
      },
      patterns: [],
    };
  }

  arg(): schema.Rule {
    return {
      patterns: [],
    };
  }

  arg_opt_type(): schema.Rule {
    return {
      patterns: [],
    };
  }

  arg_trans(): schema.Rule {
    return {
      patterns: [],
    };
  }

  atom(): schema.Rule {
    return {
      patterns: [],
    };
  }

  attribute(): schema.Rule {
    return {
      patterns: [],
    };
  }

  attributes(): schema.Rule {
    return {
      patterns: [],
    };
  }

  comment(): schema.Rule {
    return {
      patterns: [include(this.comment_block), include(this.comment_line)],
    };
  }

  comment_block(): schema.Rule {
    return {
      name: "comment.block.ddlog.dl",
      begin: "/\\*",
      end: "\\*/",
      beginCaptures: {
        0: {
          name: "punctuation.definition.comment.ddlog.dl",
        },
      },
      endCaptures: {
        0: {
          name: "punctuation.definition.comment.ddlog.dl",
        },
      },
    };
  }

  comment_line(): schema.Rule {
    return {
      contentName: "comment.line.double-slash.ddlog.dl",
      begin: "(^[ \\t]+)?((//)(?=\\s|$))",
      end: "(?=$)",
      beginCaptures: {
        1: {
          name: "punctuation.whitespace.comment.leading.ddlog.dl",
        },
        2: {
          name: "comment.line.double-slash.ddlog.dl",
        },
        3: {
          name: "punctuation.definition.comment.ddlog.dl",
        },
      },
    };
  }

  cons(): schema.Rule {
    return {
      patterns: [],
    };
  }

  escape_sequence(): schema.Rule {
    return {
      patterns: [],
    };
  }

  escape_sequence_interpolated(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp(): schema.Rule {
    return {
      patterns: [
        include(this.exp_add),
        include(this.exp_assign),
        include(this.exp_binding),
        include(this.exp_bit_and),
        include(this.exp_bit_neg),
        include(this.exp_bit_or),
        include(this.exp_bit_slice),
        include(this.exp_bit_xor),
        include(this.exp_block),
        include(this.exp_break),
        include(this.exp_cast),
        include(this.exp_cat),
        include(this.exp_cond),
        include(this.exp_continue),
        include(this.exp_cons_pos),
        include(this.exp_cons_rec),
        include(this.exp_decl_var),
        include(this.exp_div),
        include(this.exp_eq),
        include(this.exp_field),
        include(this.exp_for),
        include(this.exp_fun_call),
        include(this.exp_fun_call_dot),
        include(this.exp_gt),
        include(this.exp_gteq),
        include(this.exp_lambda),
        include(this.exp_lit),
        include(this.exp_log_and),
        include(this.exp_log_imp),
        include(this.exp_log_neg),
        include(this.exp_log_or),
        include(this.exp_lt),
        include(this.exp_lteq),
        include(this.exp_match),
        include(this.exp_mul),
        include(this.exp_neg),
        include(this.exp_neq),
        include(this.exp_proj),
        include(this.exp_ref),
        include(this.exp_rem),
        include(this.exp_return),
        include(this.exp_seq),
        include(this.exp_shl),
        include(this.exp_shr),
        include(this.exp_slice),
        include(this.exp_sub),
        include(this.exp_try),
        include(this.exp_tuple),
        include(this.exp_type),
        include(this.exp_wild),
      ],
    };
  }

  exp_add(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_assign(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_binding(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_bit_and(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_bit_neg(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_bit_or(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_bit_slice(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_bit_xor(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_block(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_break(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_cast(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_cat(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_cond(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_cons_pos(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_cons_rec(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_continue(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_decl_var(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_div(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_eq(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_field(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_for(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_fun_call(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_fun_call_dot(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_gt(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_gteq(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_lambda(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_lambda_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_lambda_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_lit(): schema.Rule {
    return {
      patterns: [
        include(this.lit_bool),
        include(this.lit_num),
        include(this.lit_map),
        include(this.lit_string),
        include(this.lit_vec),
      ],
    };
  }

  exp_log_and(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_log_imp(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_log_neg(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_log_or(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_lt(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_lteq(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_match(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_match_arm(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_mul(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_neg(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_neq(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_proj(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_ref(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_rem(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_return(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_seq(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_shl(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_shr(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_slice(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_sub(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_try(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_tuple(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_type(): schema.Rule {
    return {
      patterns: [],
    };
  }

  exp_wild(): schema.Rule {
    return {
      patterns: [],
    };
  }

  // NOTE: must be combined with `transformer` and `typedef_extern`
  extern_function_transformer_typedef(): schema.Rule {
    return {
      begin: "\\bextern\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "variable.other.readwrite.ddlog.dl",
        },
      },
      patterns: [include(this.function_normal), include(this.transformer), include(this.typedef_normal)],
    };
  }

  field(): schema.Rule {
    return {
      patterns: [],
    };
  }

  function_normal(): schema.Rule {
    return {
      begin: "\\bfunction\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "storage.type.function.ddlog.dl",
        },
      },
      patterns: [include(this.name_func)],
    };
  }

  function_normal_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  function_normal_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  import(): schema.Rule {
    return {
      begin: "\\bimport\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "keyword.control.import.ddlog.dl",
        },
      },
      patterns: [
        include(this.comment),
        {
          match: "\\s*\\bas\\b",
          name: "keyword.control.import.as.ddlog.dl",
        },
        include(this.module_path),
      ],
    };
  }

  index(): schema.Rule {
    return {
      begin: "\\bindex\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "storage.type.index.ddlog.dl",
        },
      },
      patterns: [],
    };
  }

  interpolation(): schema.Rule {
    return {
      patterns: [],
    };
  }

  item(): schema.Rule {
    return {
      patterns: [
        include(this.extern_function_transformer_typedef),
        include(this.statement_for),
        include(this.apply),
        include(this.import),
        include(this.function_normal),
        include(this.index),
        include(this.rel),
        // include(this.rule),
        include(this.typedef_normal),
      ],
    };
  }

  key_primary(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_bool(): schema.Rule {
    return {
      match: "\\b(false|true)\\b",
      name: "constant.language.boolean.ddlog.ts",
    };
  }

  lit_map(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_10(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_11(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_12(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_13(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_14(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_15(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_16(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_17(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_branch_18(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_bin(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_dec(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_float(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_hex(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_num_oct(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_string(): schema.Rule {
    return {
      patterns: [],
    };
  }

  lit_vec(): schema.Rule {
    return {
      patterns: [],
    };
  }

  module_path(): schema.Rule {
    return {
      match: `\\s*(${Rx.ident_scoped})`,
      captures: {
        1: {
          name: "variable.other.readwrite.alias.ddlog.dl",
        },
      },
    };
  }

  name(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_arg(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_cons(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_field(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_func(): schema.Rule {
    return {
      match: `\\s*(${Rx.ident_lower_scoped})`,
      captures: {
        1: { name: "entity.name.function.ddlog.dl support.function.ddlog.dl" },
      },
    };
  }

  name_index(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_rel(): schema.Rule {
    return {
      match: Rx.ident_upper_scoped,
      name: "support.class.relation.ddlog.dl support.type.relation.ddlg.dl entity.name.class.ddlog.dl entity.name.type.ddlog.dl storage.type.relation.ddlog.dl",
    };
  }

  name_trans(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_type(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_var_term(): schema.Rule {
    return {
      patterns: [],
    };
  }

  name_var_type(): schema.Rule {
    return {
      match: Rx.name_var_type,
      name: "storage.type.generic.ddlog.dl meta.name_var_type",
    };
  }

  pat(): schema.Rule {
    return {
      patterns: [
        include(this.pat_cons),
        include(this.pat_term_decl_var),
        include(this.pat_lit),
        include(this.pat_tuple),
        include(this.pat_type),
        include(this.pat_wild),
      ],
    };
  }

  pat_cons(): schema.Rule {
    return {
      patterns: [],
    };
  }

  pat_cons_pos(): schema.Rule {
    return {
      patterns: [],
    };
  }

  pat_cons_rec(): schema.Rule {
    return {
      patterns: [],
    };
  }

  pat_lit(): schema.Rule {
    return {
      patterns: [include(this.lit_bool), include(this.lit_num), include(this.lit_string)],
    };
  }

  pat_term_decl_var(): schema.Rule {
    return {
      patterns: [],
    };
  }

  pat_tuple(): schema.Rule {
    return {
      patterns: [],
    };
  }

  pat_type(): schema.Rule {
    return {
      patterns: [],
    };
  }

  pat_wild(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rel(): schema.Rule {
    return {
      patterns: [
        include(this.rel_role),
        include(this.rel_semantics),
        {
          match: "&",
        },
        include(this.name_rel),
      ],
    };
  }

  rel_role(): schema.Rule {
    return {
      patterns: [
        {
          match: "\\binput\\b",
          name: "storage.modifier.relation.role.ddlog.dl",
        },
        {
          match: "\\binternal\\b",
          name: "storage.modifier.relation.role.ddlog.dl",
        },
        {
          match: "\\boutput\\b",
          name: "storage.modifier.relation.role.ddlog.dl",
        },
      ],
    };
  }

  rel_semantics(): schema.Rule {
    return {
      patterns: [
        {
          match: "\\brelation\\b",
          name: "storage.type.relation.semantics.ddlog.dl",
        },
        {
          match: "\\bstream\\b",
          name: "storage.type.relation.semantics.ddlog.dl",
        },
        {
          match: "\\bmultiset\\b",
          name: "storage.type.relation.semantics.ddlog.dl",
        },
      ],
    };
  }

  rhs(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rhs_atom_neg(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rhs_flat_map(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rhs_grouping(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rhs_inspect(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rule(): schema.Rule {
    return {
      patterns: [],
    };
  }

  rule_end(): schema.Rule {
    return {
      patterns: [],
    };
  }

  statement(): schema.Rule {
    return {
      patterns: [
        include(this.statement_assign),
        include(this.statement_block),
        include(this.statement_empty),
        include(this.statement_for),
        include(this.statement_if),
        include(this.statement_insert),
        include(this.statement_match),
      ],
    };
  }

  statement_assign(): schema.Rule {
    return {
      patterns: [],
    };
  }

  statement_block(): schema.Rule {
    return {
      begin: "{",
      end: "}",
      name: "meta.statement_block.ddlog.dl",
      patterns: [
        {
          name: "punctuation.terminator.statement.ddlog.dl",
          match: ";",
        },
        include(this.statement),
      ],
    };
  }

  statement_empty(): schema.Rule {
    return {
      name: "keyword.control.skip.ddlog.dl",
      match: "\\bskip\\b",
    };
  }

  statement_for(): schema.Rule {
    return {
      begin: "\\bfor\\b",
      end: `(?<=${Rx.statement_end.lookbehind})`,
      beginCaptures: {
        0: {
          name: "keyword.control.loop.ddlog.dl",
        },
      },
      name: "meta.statement_for.ddlog.dl",
      patterns: [
        {
          begin: "\\(",
          end: "\\)",
          patterns: [
            {
              begin: "\bif\b",
              end: "(?=\\))",
              patterns: [include(this.atom), include(this.exp)],
            },
          ],
        },
        include(this.statement),
      ],
    };
  }

  statement_if(): schema.Rule {
    return {
      begin: "\\bif\\b",
      end: `(?<=${Rx.statement_end.lookbehind})`,
      beginCaptures: {
        0: {
          name: "keyword.control.conditional.ddlog.dl",
        },
      },
      name: "meta.statement_if.ddlog.dl",
      patterns: [
        {
          begin: "\\(",
          end: "\\)",
          patterns: [include(this.exp)],
        },
        {
          begin: "\\belse\\b",
          end: `(?<=${Rx.statement_end.lookbehind})`,
          beginCaptures: {
            0: {
              name: "keyword.control.conditional.ddlog.dl",
            },
          },
          patterns: [include(this.statement)],
        },
        include(this.statement),
      ],
    };
  }

  statement_insert(): schema.Rule {
    return {
      patterns: [include(this.atom)],
    };
  }

  statement_match(): schema.Rule {
    return {
      begin: "\\bmatch\\b",
      end: `(?<=})`,
      beginCaptures: {
        0: {
          name: "keyword.control.match.ddlog.dl",
        },
      },
      name: "meta.statement_match.ddlog.dl",
      patterns: [
        {
          begin: "\\(",
          end: "\\)",
          patterns: [include(this.exp)],
        },
        {
          begin: "{",
          end: "}",
          patterns: [
            {
              name: "punctuation.terminator.match-arm.ddlog.dl",
              match: ",",
            },
          ],
        },
      ],
    };
  }

  statement_match_arm(): schema.Rule {
    return {
      begin: `(?=${Rx.pat.lookahead})`,
      end: `(?<=${Rx.statement_end.lookbehind})`,
      patterns: [
        include(this.pat),
        {
          match: "->",
          name: "punctuation.separator.match-arm.ddlog.dl",
        },
        include(this.statement),
      ],
    };
  }

  string_quoted(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_quoted_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_quoted_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_quoted_escaped_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_quoted_escaped_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_raw_interpolated(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_raw_interpolated_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  string_raw_interpolated_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  transformer(): schema.Rule {
    return {
      begin: "\\btransformer\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "storage.type.transformer.ddlog.dl",
        },
      },
      patterns: [],
    };
  }

  type(): schema.Rule {
    return {
      patterns: [
        include(this.type_bit),
        include(this.type_signed),
        include(this.type_bigint),
        include(this.type_double),
        include(this.type_float),
        include(this.type_string),
        include(this.type_bool),
        include(this.type_union),
        include(this.type_user),
        include(this.type_var),
        include(this.type_fun),
        include(this.type_tuple),
      ],
    };
  }

  type_atom(): schema.Rule {
    return {
      patterns: [
        include(this.type_bit),
        include(this.type_signed),
        include(this.type_bigint),
        include(this.type_double),
        include(this.type_float),
        include(this.type_string),
        include(this.type_bool),
        include(this.type_user),
        include(this.type_var),
        include(this.type_fun),
        include(this.type_tuple),
      ],
    };
  }

  type_bigint(): schema.Rule {
    return {
      match: "\\bbigint\\b",
      name: "support.type.primitive.ddlog.dl",
    };
  }

  type_bit(): schema.Rule {
    return {
      begin: "\\bbit\\b",
      end: "(?<=>)",
      beginCaptures: {
        0: {
          name: "support.type.primitive.ddlog.dl",
        },
      },
      name: "meta.type_bit.ddlog.dl",
      patterns: [
        {
          begin: "<",
          end: ">",
          patterns: [include(this.lit_num_dec)],
        },
      ],
    };
  }

  type_bool(): schema.Rule {
    return {
      match: "\\bbool\\b",
      name: "support.type.primitive.ddlog.dl",
    };
  }

  type_double(): schema.Rule {
    return {
      match: "\\bdouble\\b",
      name: "support.type.primitive.ddlog.dl",
    };
  }

  type_float(): schema.Rule {
    return {
      match: "\\bfloat\\b",
      name: "support.type.primitive.ddlog.dl",
    };
  }

  type_fun(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_fun_branch_0(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_fun_branch_1(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_signed(): schema.Rule {
    return {
      begin: "\\bsigned\\b",
      end: "(?<=>)",
      beginCaptures: {
        0: {
          name: "support.type.primitive.ddlog.dl",
        },
      },
      name: "meta.type_signed.ddlog.dl",
      patterns: [
        {
          begin: "<",
          end: ">",
          patterns: [include(this.lit_num_dec)],
        },
      ],
    };
  }

  type_string(): schema.Rule {
    return {
      match: "\\bstring\\b",
      name: "support.type.primitive.ddlog.dl",
    };
  }

  type_trans(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_trans_fun(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_trans_rel(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_tuple(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_union(): schema.Rule {
    return {
      patterns: [],
    };
  }

  type_user(): schema.Rule {
    return {
      begin: `\\s*(?!.*(:-|,|\\.)\\s*$)(${Rx.ident_scoped})`,
      end: "(?<=[>}])|(?=\\|)",
      beginCaptures: {
        0: {
          name: "support.type.primitive.ddlog.dl",
        },
      },
      name: "meta.type_user.ddlog.dl",
      patterns: [
        {
          begin: "<",
          end: ">",
          patterns: [
            {
              match: ",",
            },
            include(this.type),
          ],
        },
      ],
    };
  }

  type_var(): schema.Rule {
    return {
      match: `'${Rx.ident_upper}`,
      name: "storage.type.generic.ddlog.dl",
    };
  }

  typedef_normal(): schema.Rule {
    return {
      begin: "\\btypedef\\b",
      end: `(?=${Rx.item.lookahead})`,
      beginCaptures: {
        0: {
          name: "storage.type.typedef.ddlog.dl",
        },
      },
      name: "meta.typedef_normal.ddlog.dl",
      patterns: [
        {
          begin: `\\s*(${Rx.ident_scoped})`,
          end: `(?=${Rx.item.lookahead})`,
          beginCaptures: {
            1: {
              name: "support.class.relation.ddlog.dl support.type.relation.ddlg.dl entity.name.class.ddlog.dl entity.name.type.ddlog.dl storage.type.relation.ddlog.dl",
            },
          },
          patterns: [
            {
              begin: "<",
              end: ">",
            },
            {
              match: "=",
              end: "",
            },
            include(this.type),
          ],
        },
      ],
    };
  }
}

export default new DDlogDl().render();
